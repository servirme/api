'use strict';

class Model {
    constructor() {
        this._transform = false;
        this._repository = false;
    }

    /**
     * @param {BaseRepository} Repository
     * @param {string} alias
     * @protected
     */
    _useRepository(Repository, alias = false) {
        /* BaseRepository */
        const repository = new Repository();
        if (!alias) {
            this._repository = repository;
        } else {
            if (!this._repository) {
                this._repository = {};
            }
            this._repository[alias] = repository;
        }
        return this;
    }

    /**
     * @param {Repository} Transform
     * @param {string} alias
     * @protected
     */
    _useTransform(Transform, alias = false) {
        const transform = new Transform();
        if (!alias) {
            this._transform = transform;
        } else {
            if (!this._transform) {
                this._transform = {};
            }
            this._transform[alias] = transform;
        }
        return this;
    }
}

module.exports = Model;
