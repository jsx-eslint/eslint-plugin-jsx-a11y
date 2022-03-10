<p align="center">
  <a href="https://travis-ci.com/github/jsx-eslint/eslint-plugin-jsx-a11y">
    <img src="https://travis-ci.com/jsx-eslint/eslint-plugin-jsx-a11y.svg?branch=master"
         alt="build status">
  </a>
  <a href="https://npmjs.org/package/eslint-plugin-jsx-a11y">
    <img src="https://img.shields.io/npm/v/eslint-plugin-jsx-a11y.svg"
         alt="npm version">
  </a>
  <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/eslint-plugin-jsx-a11y.svg"
         alt="license">
  </a>
  <a href='https://coveralls.io/github/evcohen/eslint-plugin-jsx-a11y?branch=master'>
    <img src='https://coveralls.io/repos/github/evcohen/eslint-plugin-jsx-a11y/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://npmjs.org/package/eslint-plugin-jsx-a11y'>
    <img src='https://img.shields.io/npm/dt/eslint-plugin-jsx-a11y.svg'
    alt='Total npm downloads' />
  </a>
</p>

<a href='https://tidelift.com/subscription/pkg/npm-eslint-plugin-jsx-a11y?utm_source=npm-eslint-plugin-jsx-a11y&utm_medium=referral&utm_campaign=readme'>Obtenga soporte profesional para eslint-plugin-jsx-a11y en Tidelift</a>

# eslint-plugin-jsx-a11y

Comprobador AST estático para reglas de accesibilidad en elementos JSX.

## ¿Porque?
Este plugin realiza una evaluación estática de JSX para detectar problemas de accesibilidad en las aplicaciones React. Dado que sólo detecta errores en el código estático, úsalo en combinación con @axe-core/react para comprobar la accesibilidad del DOM generado. Considera estas herramientas sólo como un paso de un proceso más amplio de pruebas de accesibilidad y prueba siempre tus aplicaciones con tecnología de asistencia.

## Instalación

**Si está instalando este complemento a través de `eslint-config-airbnb`, por favor sigue [estas instrucciones](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb-1).**

Primero tendrá que instalar [ESLint](http://eslint.org): 

```sh
# npm
npm install eslint --save-dev

# yarn
yarn add eslint --dev
```

Siguiente, instale `eslint-plugin-jsx-a11y`:

```sh
# npm
npm install eslint-plugin-jsx-a11y --save-dev

# yarn
yarn add eslint-plugin-jsx-a11y --dev
```

**Nota:** Si instaló ESLint globalmente (usando `-g` en npm, o el prefijo `global` en yarn) tambien tendra que instalar `eslint-plugin-jsx-a11y` globalmente.



## Uso

Añade `jsx-a11y` a la sección de "plugins" de su `.eslintrc` archivo de configuración. Puede omitir el prefijo `eslint-plugin-` :

```json
{
  "plugins": [
    "jsx-a11y"
  ]
}
```


Luego configure las reglas que quiera usar bajo la sección "rules".

```json
{
  "rules": {
    "jsx-a11y/nombre-de-regla": 2
  }
}
```

También puede permitir todas las reglas recomendadas o estrictas de una vez.
Añade `plugin:jsx-a11y/recommended` o `plugin:jsx-a11y/strict` dentro "`extends`":

```json
{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ]
}
```

## Reglas Soportadas

- [accessible-emoji](docs/rules/accessible-emoji.md): Enforce emojis están envueltos en `<span>` y brindan acceso al lector de pantalla.
- [alt-text](docs/rules/alt-text.md): Enforce todos los elementos que requieren texto alternativo tenga información significativa para transmitir al usuario.
- [anchor-has-content](docs/rules/anchor-has-content.md): Enforce todos los anclajes  contengan contenido accesible.
- [anchor-is-valid](docs/rules/anchor-is-valid.md): Enforce todas las anclas son elementos navegables válidos.
- [aria-activedescendant-has-tabindex](docs/rules/aria-activedescendant-has-tabindex.md): Enforce elementos con aria-activedescendant son accesibles por tab.
- [aria-props](docs/rules/aria-props.md): Enforce todos los accesorios `aria- *` son válidos.
- [aria-proptypes](docs/rules/aria-proptypes.md): Enforce el estado ARIA y los valores de propiedad son válidos
- [aria-role](docs/rules/aria-role.md): Enforce que los elementos con roles ARIA deben usar un rol ARIA válido y no abstracto.
- [aria-unsupported-elements](docs/rules/aria-unsupported-elements.md): Enforce que los elementos que no admitan roles, estados y propiedades de ARIA no tengan esos atributos.
- [autocomplete-valid](docs/rules/autocomplete-valid.md): Enforce los atributos de autocompletar se utilicen correctamente.
- [click-events-have-key-events](docs/rules/click-events-have-key-events.md): Enforce un elemento no interactivo de clic tiene al menos un detector de eventos de teclado.
- [heading-has-content](docs/rules/heading-has-content.md): Enforce los elementos de encabezada (`h1`,` h2`, etc.) contienen contenido accesible.
- [html-has-lang](docs/rules/html-has-lang.md): Enforce el elemento `<html>` tiene la propiedad `lang`.
- [iframe-has-title](docs/rules/iframe-has-title.md): Enforce los elementos de iframe tiene un atributo de título.
- [img-redundant-alt](docs/rules/img-redundant-alt.md): Enforce `<img>` alt prop no contiene la palabra "imagen", "imagen" o "foto".
- [interactive-supports-focus](docs/rules/interactive-supports-focus.md): Enforce los elementos con controladores interactivos como "onClick" deben poder enfocarse.
- [label-has-associated-control](docs/rules/label-has-associated-control.md): Enforce una etiqueta `label` tenga una etiqueta de texto y un control asociado.
- [lang](docs/rules/lang.md): Enforce el atributo lang tiene un valor válido.
- [media-has-caption](docs/rules/media-has-caption.md): Enforce los elementos `<audio>` y `<video>` tiene un `<track>` para los subtítulos.
- [mouse-events-have-key-events](docs/rules/mouse-events-have-key-events.md): Enforce que `onMouseOver`/`onMouseOut` son acompañados por `onFocus`/`onBlur` para usuarios de solo teclado.
- [no-access-key](docs/rules/no-access-key.md): Enforce la propiedad `accessKey` no se use en ningún elemento para evitar complicaciones con comandos del teclado usados por un lector de pantalla
- [no-autofocus](docs/rules/no-autofocus.md): Enforce que no se utilice propiedad autoFocus.
- [no-distracting-elements](docs/rules/no-distracting-elements.md): Enforce elementos que distraen no se utilizen.
- [no-interactive-element-to-noninteractive-role](docs/rules/no-interactive-element-to-noninteractive-role.md): Elementos interactivos no se les deben asignar roles no interactivos.
- [no-noninteractive-element-interactions](docs/rules/no-noninteractive-element-interactions.md): Elementos no interactivos no se les debe asignar detectores de eventos de mouse o teclado.
- [no-noninteractive-element-to-interactive-role](docs/rules/no-noninteractive-element-to-interactive-role.md): Elementos no interactivos no se les deben asignar roles interactivos.
- [no-noninteractive-tabindex](docs/rules/no-noninteractive-tabindex.md): Declare `tabIndex` solo en elementos interactivos.
- [no-onchange](docs/rules/no-onchange.md): Enforce `onBlur` sobre ` onChange` en menús selectos para accesibilidad.
- [no-redundant-roles](docs/rules/no-redundant-roles.md): Enforce propiedad de función explícita no es lo mismo que la propiedad de función implícita / predeterminada en el elemento.
- [no-static-element-interactions](docs/rules/no-static-element-interactions.md): Enforce elementos visibles no interactivos (como `<div>`) que tienen controladores de clic usan el atributo de rol.
- [role-has-required-aria-props](docs/rules/role-has-required-aria-props.md): Enforce elementos con roles ARIA tengan todos los atributos requeridos para ese rol.
- [role-supports-aria-props](docs/rules/role-supports-aria-props.md): Enforce elementos con roles explícitos o implícitos definidos contengan solo propiedades `aria- *` admitidas por ese `rol`.
- [scope](docs/rules/scope.md): Enforce `scope` prop solo se usa en elementos` <th> `.
- [tabindex-no-positive](docs/rules/tabindex-no-positive.md): Enforce el valor de `tabIndex` no es mas de cero.

### Diferencia entre modos 'recomendedo' y 'estricto' 

| Regla                                                        | Recomendedo         | Estricto |
| ------------------------------------------------------------ | ------------------- | -------- |
| [accessible-emoji](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md) | error               | error    |
| [alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md) | error               | error    |
| [anchor-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md) | error               | error    |
| [anchor-is-valid](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md) | error               | error    |
| [aria-activedescendant-has-tabindex](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md) | error               | error    |
| [aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md) | error               | error    |
| [aria-proptypes](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md) | error               | error    |
| [aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md) | error               | error    |
| [aria-unsupported-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md) | error               | error    |
| [autocomplete-valid](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/autocomplete-valid.md) | error               | error    |
| [click-events-have-key-events](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md) | error               | error    |
| [heading-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md) | error               | error    |
| [html-has-lang](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md) | error               | error    |
| [iframe-has-title](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md) | error               | error    |
| [img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md) | error               | error    |
| [interactive-supports-focus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md) | error               | error    |
| [label-has-associated-control](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md) | error               | error    |
| [media-has-caption](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md) | error               | error    |
| [mouse-events-have-key-events](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md) | error               | error    |
| [no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md) | error               | error    |
| [no-autofocus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md) | error               | error    |
| [no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md) | error               | error    |
| [no-interactive-element-to-noninteractive-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-interactive-element-to-noninteractive-role.md) | error, con opciones | error    |
| [no-noninteractive-element-interactions](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md) | error, con opciones | error    |
| [no-noninteractive-element-to-interactive-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md) | error, con opciones | error    |
| [no-noninteractive-tabindex](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md) | error, con opciones | error    |
| [no-onchange](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md) | error               | error    |
| [no-redundant-roles](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md) | error               | error    |
| [no-static-element-interactions](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md) | error, con opciones | error    |
| [role-has-required-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md) | error               | error    |
| [role-supports-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md) | error               | error    |
| [scope](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md) | error, con opciones | error    |
| [tabindex-no-positive](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md) | error               | error    |

Las siguiente reglas tienen otras opciones disponibles cuando en modo *recomendado*:

#### no-interactive-element-to-noninteractive-role

```js
'jsx-a11y/no-interactive-element-to-noninteractive-role': [
  'error',
  {
    tr: ['none', 'presentation'],
  },
]
```

#### no-noninteractive-element-interactions

```js
'jsx-a11y/no-noninteractive-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
]
```

#### no-noninteractive-element-to-interactive-role

```js
'jsx-a11y/no-noninteractive-element-to-interactive-role': [
  'error',
  {
    ul: [
      'listbox',
      'menu',
      'menubar',
      'radiogroup',
      'tablist',
      'tree',
      'treegrid',
    ],
    ol: [
      'listbox',
      'menu',
      'menubar',
      'radiogroup',
      'tablist',
      'tree',
      'treegrid',
    ],
    li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
    table: ['grid'],
    td: ['gridcell'],
  },
]
```

#### no-noninteractive-tabindex

```js
'jsx-a11y/no-noninteractive-tabindex': [
  'error',
  {
    tags: [],
    roles: ['tabpanel'],
  },
]
```

#### no-static-element-interactions

```js
'jsx-a11y/no-noninteractive-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
]
```

## Creando una nueva regla

Si está desarrollando nuevas reglas para este proyecto, puede usar el `create-rule` script para aplicar scaffolding a los nuevos archivos. 

```
$ ./scripts/create-rule.js my-new-rule
```

## Contexto sobre WAI-ARIA, el árbol AX y los navegadores

### API de accesibilidad

El sistema operativo proporcionará un API de accesibilidad que mapea el estado y el contenido de la aplicación en controladores de entrada / salida, como ejemplo un lector de pantalla, dispositivo braille, teclado, etc.

Estas APIs se desarrollaron cuando las interfaces de computadora se cambiaron de búferes (que son basados en texto e intrínsecamente bastante accesibles) a interfaces gráficas de usuario (GUI). Los primeros intentos de hacer GUIs accesibles involucraron el análisis sintáctico de imágenes ráster para reconocer caracteres, palabras, etc. Esta información se almacenó en un búfer paralelo y se hizo accesible a los dispositivos de tecnología de asistencia (AT).

Las GUIs se volvieron más complejas, y el análisis sintáctico ráster se volvió insostenible. Las APIs de accesibilidad fueron desarrolladasolladas para reemplazarlas. Consulte [NSAccessibility (AXAPI)](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/ApplicationKit/Protocols/NSAccessibility_Protocol/index.html) por ejemplos. Consulte [Core Accessibility API Mappings 1.1](https://www.w3.org/TR/core-aam-1.1/) para más detalles.

### Navegadores

Los navegadores apoyan ciertad API de accesibilidad dependiendo en el sistema operativo. Por ejemplo, Firefox implementa la API de accesibilidad MSAA en Windows, pero no implementa AXAPI en OSX.

### El árbol de accesibilidad (AX) y DOM

De parte de [W3 Core Accessibility API Mappings 1.1](https://www.w3.org/TR/core-aam-1.1/#intro_treetypes)

> El árbol de accesibilidad y el árbol DOM son estructuras paralelas. En términos generales, el árbol de accesibilidad es un subconjunto del árbol DOM. Incluye los objetos de la interfaz de usuario y los objetos del documento. Los objetos accesibles se crean en el árbol de accesibilidad por cada elemento DOM que debe ser expuesto a la tecnología de asistencia, ya sea porque puede desencadenar un evento de accesibilidad o porque tiene una propiedad, relación o característica que debe exponerse. Generalmente, si algo puede ser omitido, sera, por razones de rendimiento y simplicidad. Por ejemplo, un `<span>` con solo un cambio de estilo y sin semántica puede que no obtenga su propio objeto accesible, pero el cambio de estilo será expuesto por otros medios.

Los proveedores de navegadores están comenzando a exponer el árbol AX a través de herramientas de inspección. Chrome tiene un experimento disponible para permitir su herramienta de inspección.

También puede ver una versión basada en texto del árbol AX en Chrome en la versión estable.

#### Ver el árbol de AX en Chrome

  1. Navegar a `chrome://accessibility/` en Chrome.
  1. Cambie el `accessibility off` enlace por cualquier tab que quiere inspeccionar.
  1. Un enlace mostrando `show accessibility tree` aparecerá; seleccione el enlace.
  1. Vacile ansiosamente a la pantalla de texto, pero luego recupere su convicción.
  1. Utilice el comando de búsqueda para localizar cadenas y valores en el texto.

### Juntándolo todo

El navegador construye un árbol AX como un subconjunto del DOM. ARIA informa en gran medida las propiedades del árbol AX. Este árbol AX está expuesto a la API de accesibilidad a nivel del sistema, que actúa como intermediario en los agentes de tecnología de asistencia.

Modelamos ARIA en el proyecto [aria-query](https://github.com/a11yance/aria-query). Modelamos AXObjects (que componen el árbol AX) en el proyecto [axobject-query](https://github.com/A11yance/axobject-query). El objetivo de la especificación WAI-ARIA es ser una interfaz declarativa completa para el modelo AXObject. La [versión 1.2 en borrador](https://github.com/w3c/aria/issues?q=is%3Aissue+is%3Aopen+label%3A%22ARIA+1.2%22) avanza hacia este objetivo. Pero hasta entonces, debemos considerar las construcciones semánticas que ofrece ARIA, así como las que ofrece el modelo AXObject (AXAPI) para determinar cómo se puede usar HTML para expresar las ofrendas de la interfaz de usuario para los usuarios de tecnología de asistencia.

## Licencia

eslint-plugin-jsx-a11y es licenciada bajo el [MIT License](LICENSE.md).