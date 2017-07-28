import { AutoCompletePage } from './app.po';

describe('auto-complete App', () => {
  let page: AutoCompletePage;

  beforeEach(() => {
    page = new AutoCompletePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
