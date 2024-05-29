declare module 'node-wol' {
    interface WakeOptions {
      address?: string;
      port?: number;
      num_packets?: number;
      interval?: number;
      mac?: string;
      ipv6?: boolean;
    }
  
    export function wake(mac: string, opts?: WakeOptions, callback?: (error: Error | null) => void): void;
    export function createMagicPacket(mac: string): Buffer;
  }
  