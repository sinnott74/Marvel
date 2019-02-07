/**
 * Responsible for registering reducers
 */
export class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

  /**
   * Get all reducers
   */
  getReducers() {
    return { ...this._reducers };
  }

  /**
   * Register a reducer
   * @param {string} name
   * @param {*} reducer
   */
  register(name, reducer) {
    this._reducers[name] = reducer;

    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

export default new ReducerRegistry();
