import { getAuthToken } from '../api';
import publicApi from 'src/configs/publicApi';

jest.mock('src/configs/publicApi', () => ({
  get: jest.fn(),
}));

describe('auth api', () => {
  describe('getAuthToken', () => {
    it('should return an auth token', async () => {
      const authResponse = { token: 'abcd1234' };
      (publicApi.get as jest.Mock).mockResolvedValueOnce({
        data: authResponse,
      });

      const result = await getAuthToken();

      expect(result).toEqual(authResponse);
      expect(publicApi.get).toHaveBeenCalledWith(
        '/auth/anonymous?platform=subscriptions'
      );
    });
  });
});
