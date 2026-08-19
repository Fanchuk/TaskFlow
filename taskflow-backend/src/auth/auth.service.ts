import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already in use');

    const invite = await this.prisma.invitation.findFirst({
      where: { email: dto.email, status: 'pending' },
    });

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        password: hash,
        role: invite?.role ?? 'member',
      },
    });

    if (invite) {
      await this.prisma.invitation.update({
        where: { id: invite.id },
        data: { status: 'accepted' },
      });
    }

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    
    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async me(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, fullName: true, role: true, settings: true, status: true },
    });
  }

  private async signToken(id: string, email: string, fullName: string, role: string) {
    const token = await this.jwt.signAsync({ sub: id, email, role });
    return { token, user: { id, email, fullName, role } };
  }
}