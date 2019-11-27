/* eslint-disable import/prefer-default-export, no-underscore-dangle */
import * as axe from 'axe-core';

export function axeFailMessage(checkId, data) {
  return axe._audit.data.checks[checkId].messages.fail(data);
}
