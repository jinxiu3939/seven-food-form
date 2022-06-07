import { Injectable } from '@angular/core';

import { LANG } from '../../lang/lang.const';

@Injectable()
export class LangProvider {

  public lang = LANG.zh;

}
