// SPDX-FileCopyrightText: 2018-2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0

import xs, {Stream} from 'xstream';
import {h} from '@cycle/react';
import {View, StyleSheet, Platform} from 'react-native';
import {Palette} from '../global-styles/palette';
import {propifyMethods} from 'react-propify-methods';
import {ReactElement} from 'react';
const Swiper =
  Platform.OS === 'web'
    ? propifyMethods<any, any, any>(require('./Swiper').default, 'scrollBy')
    : propifyMethods<any, any, any>(require('react-native-swiper'), 'scrollBy');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Palette.brandMain,
  },
});

export type Props = {
  scrollBy$?: Stream<[/* offset */ number, /* animated */ boolean]>;
};

export default function tutorialPresentation(
  sel: string | symbol,
  props: Props | null,
  children: Array<ReactElement | null>,
) {
  return h(View, {style: styles.container}, [
    h(
      Swiper,
      {
        sel,
        showsButtons: false,
        horizontal: true,
        loop: false,
        scrollBy$: props?.scrollBy$ ?? xs.never(),
        activeDotColor: Palette.colors.white,
        automaticallyAdjustContentInsets: true,
      },
      children.filter((x) => !!x),
    ),
  ]);
}
