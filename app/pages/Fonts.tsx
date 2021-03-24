import * as React from "react"
import { Global } from "@emotion/react"

export const Fonts = () => (
  <Global
    styles={`
    /* rubik-300 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 300;
      src: url('../fonts/rubik-v12-latin-ext_latin-300.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-300.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-300.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-300.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-regular - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      src: url('../fonts/rubik-v12-latin-ext_latin-regular.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-regular.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-regular.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-500 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 500;
      src: url('../fonts/rubik-v12-latin-ext_latin-500.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-500.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-500.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-500.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-600 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 600;
      src: url('../fonts/rubik-v12-latin-ext_latin-600.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-600.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-600.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-600.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-700 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 700;
      src: url('../fonts/rubik-v12-latin-ext_latin-700.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-700.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-700.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-700.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-800 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 800;
      src: url('../fonts/rubik-v12-latin-ext_latin-800.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-800.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-800.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-800.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-800.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-800.svg#Rubik') format('svg'); /* Legacy iOS */
    }
    /* rubik-900 - latin-ext_latin */
    @font-face {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 900;
      src: url('../fonts/rubik-v12-latin-ext_latin-900.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('../fonts/rubik-v12-latin-ext_latin-900.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('../fonts/rubik-v12-latin-ext_latin-900.woff2') format('woff2'), /* Super Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-900.woff') format('woff'), /* Modern Browsers */
           url('../fonts/rubik-v12-latin-ext_latin-900.ttf') format('truetype'), /* Safari, Android, iOS */
           url('../fonts/rubik-v12-latin-ext_latin-900.svg#Rubik') format('svg'); /* Legacy iOS */
    }
      `}
  />
)
