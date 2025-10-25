declare interface ImportMeta {
  glob<T = unknown>(pattern: string, options: { eager: true }): Record<string, T>;
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: false }
  ): Record<string, () => Promise<T>>;
}
