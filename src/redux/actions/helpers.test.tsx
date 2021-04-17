import moxios from 'moxios';
import { API_BASE_URL } from './helpers';
import axios from 'axios';

describe('Tests for API', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Check for the response', (done) => {
        const api = `${API_BASE_URL}/venues/164/activities`;
        moxios.stubRequest(api, { status: 200, response: { success: true } }); //mocked response

        axios.get(api).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
});
