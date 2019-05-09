import 'core-js/stable';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import { CustomElementRegistry } from 'aurelia-web-components';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .globalResources(PLATFORM.moduleName('resources/my-component'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  // aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));

  aurelia
     .start()
     .then(() => {
      const registry = aurelia.container.get(CustomElementRegistry);

      //The following line takes all global resource custom elements and registers them as web components.
      //Once the element is registered, in-page elements will begin rendering.
      registry.useGlobalElements();
    });
}
