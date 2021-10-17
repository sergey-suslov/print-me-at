import { Injectable } from '@nestjs/common'

@Injectable()
export class ProbeService {
  async check() {
    return true
  }
}
