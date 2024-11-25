declare module 'wake-on-lan' {
    interface WakeOptions {
      address?: string;
      port?: number;
      num_packets?: number;
      interval?: number;
    }
  
    export function wake(
      mac: string,
      opts?: WakeOptions,
      callback?: (error: Error | null) => void
    ): void;
  }  