import { errorFormatter } from '../../utils/errorFormatters.mjs';
import { defaultErrorMessage } from '../../utils/constants.mjs';

describe('should format errors as expected', () => {
  it('send default message when called with nothing', () => {
    let error;
    expect(errorFormatter(error)).toBe(defaultErrorMessage);
  });
  it("send the default message when there is no 'msg' property on the error object", () => {
    const errorNoMsg = {
      name: 'ValidationError',
      path: 'name',
      value: 'Stuffs',
    };
    expect(errorFormatter(errorNoMsg)).toBe(defaultErrorMessage);
  });

  it('send the formatted message when all the proper keys are available', () => {
    const errorComplete = {
      path: 'name',
      value: 'Stuffs',
      msg: 'Name requires to be between 8 and 20 characters',
    };
    expect(errorFormatter(errorComplete)).toBe(
      `Invalid value '${errorComplete.value}' for '${errorComplete.path}. ${errorComplete.msg}'`
    );
  });
});
