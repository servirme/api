'use strict';

const chai = require('chai');
const string = require('../../../../src/lib/utils/string');

const expect = chai.expect;

describe('String Utils', () => {
    describe('uuid', () => {
        it('with dashes', () => {
            const uuid = string.uuid(false);
            expect(uuid).to.be.an('string')
                .and.to.have.lengthOf(36);
        });

        it('without dashes', () => {
            const uuid = string.uuid();
            expect(uuid).to.be.an('string')
                .and.to.have.lengthOf(32);

            const uuid2 = string.uuid(true);
            expect(uuid2).to.be.an('string')
                .and.to.have.lengthOf(32);
        });
    });
});
