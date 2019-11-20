export enum Mode {
  JSON = "json",
  TABLE = "table",
};

// User Interface
class User {

  mode: Mode = Mode.JSON;

  static empty(): User {
    return new User();
  }

  setJsonMode(): void {
    this.mode = Mode.JSON;
  }

  isJsonMode(): boolean {
    return this.mode === Mode.JSON;
  }
  setTableMode(): void {
    this.mode = Mode.TABLE;
  }

  isTableMode(): boolean {
    return this.mode === Mode.TABLE;
  }
}

export default User;
