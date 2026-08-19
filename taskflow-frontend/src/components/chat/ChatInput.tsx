import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Mic, StopCircle, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import fixWebmDuration from 'fix-webm-duration';
import { chatService } from '../../services/chat.service';

interface Props {
  onSend: (data: { text?: string; fileUrl?: string; fileType?: string; fileName?: string }) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [draft, setDraft] = useState('');
  const [recording, setRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [attachment, setAttachment] = useState<{ file: File | Blob; previewUrl: string; type: string; name: string } | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const recordingStartTime = useRef<number>(0);

  const handleSend = async () => {
    if (!draft.trim() && !attachment) return;

    setIsUploading(true);
    let finalFileUrl = undefined;

    try {
      if (attachment) {
        finalFileUrl = await chatService.upload(attachment.file, attachment.name);
      }

      onSend({
        text: draft.trim() || undefined,
        fileUrl: finalFileUrl,
        fileType: attachment?.type,
        fileName: attachment?.name
      });

      setDraft('');
      setAttachment(null);
    } catch (error) {
      console.error('Send error:', error);
      toast.error('Failed to send message');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📎 File selected:', file.name, file.type, `${(file.size / 1024).toFixed(1)} KB`);

    if (file.size > 20 * 1024 * 1024) {
      toast.error('Max file size is 20MB');
      return;
    }

    const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';
    const previewUrl = URL.createObjectURL(file);

    setAttachment({ file, previewUrl, type, name: file.name });
    e.target.value = '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      recordingStartTime.current = Date.now();

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const duration = Date.now() - recordingStartTime.current;
        const rawBlob = new Blob(chunks.current, { type: 'audio/webm' });

        if (rawBlob.size < 1000) {
          toast.error('Recording is too short or empty, please try again');
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        fixWebmDuration(rawBlob, duration, (fixedBlob) => {
          console.log('🎤 Recording done, size:', `${(fixedBlob.size / 1024).toFixed(1)} KB`, 'duration:', `${(duration / 1000).toFixed(1)}s`);

          const previewUrl = URL.createObjectURL(fixedBlob);
          setAttachment({ file: fixedBlob, previewUrl, type: 'audio', name: 'voice.webm' });
        });

        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.current.start(250);
      setRecording(true);
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        toast.error('Microphone access denied by browser');
      } else if (err.name === 'NotFoundError') {
        toast.error('No microphone found');
      } else {
        toast.error('Failed to access microphone');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="flex flex-col border-t border-[#374151] bg-[#1f2937] p-4">
      <AnimatePresence>
        {attachment && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="mb-3 flex items-start justify-between rounded-xl bg-[#374151] p-3"
          >
            <div className="flex-1">
              {attachment.type === 'image' && <img src={attachment.previewUrl} alt="Preview" className="max-h-32 rounded-lg object-cover" />}
              {attachment.type === 'video' && <video src={attachment.previewUrl} controls className="max-h-32 rounded-lg" />}
              {attachment.type === 'audio' && <audio src={attachment.previewUrl} controls className="max-w-[250px] sm:max-w-[400px]" />}
              {attachment.type === 'file' && (
                <div className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5" />
                  <span className="text-sm">{attachment.name}</span>
                </div>
              )}
            </div>

            <button onClick={() => setAttachment(null)} className="rounded-full bg-white/10 p-1.5 text-white/60 hover:bg-red-500/20 hover:text-red-400">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <input ref={fileInput} type="file" className="hidden" onChange={handleFile} />

        <button onClick={() => fileInput.current?.click()} disabled={isUploading} className="rounded-lg p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-50">
          <Paperclip className="h-5 w-5" />
        </button>

        {recording ? (
          <button onClick={stopRecording} className="animate-pulse rounded-lg p-2.5 text-red-400 transition hover:bg-red-500/10">
            <StopCircle className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={startRecording} disabled={isUploading} className="rounded-lg p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-50">
            <Mic className="h-5 w-5" />
          </button>
        )}

        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isUploading}
          placeholder={isUploading ? 'Sending...' : 'Type your message...'}
          className="flex-1 rounded-lg bg-[#374151] px-4 py-3 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-[#4f46e5]/50 disabled:opacity-50"
        />

        <motion.button
          whileHover={!isUploading ? { scale: 1.05 } : {}}
          whileTap={!isUploading ? { scale: 0.95 } : {}}
          onClick={handleSend}
          disabled={isUploading || (!draft.trim() && !attachment)}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition ${
            (draft.trim() || attachment) && !isUploading
              ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
              : 'bg-[#374151] text-white/30 cursor-not-allowed'
          }`}
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="hidden sm:inline">{isUploading ? 'Sending' : 'Send'}</span>
        </motion.button>
      </div>
    </div>
  );
}