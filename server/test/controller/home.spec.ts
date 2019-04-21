import 'mocha';

import { expect } from 'chai';
import { HomeController } from '../../controller/home';

describe('HomeController', () => {
  it('should give back `Home sweet home`', () => {
    const service = new HomeController();

    expect(service.get()).to.equal('Home sweet home');
  });
});
