class BaseError extends Error {
  override name: string;

  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 二重登録疑い
export class SuspiciousDuplicatedRegistriationError extends BaseError {}

// 他端末使用中
export class RecordIsBusyError extends BaseError {}
