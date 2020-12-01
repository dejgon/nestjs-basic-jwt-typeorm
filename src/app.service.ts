import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'siemanko panocki! xddd';
  }

  returnName(name: string): string {
    return name;
  }
}
