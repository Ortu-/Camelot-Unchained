/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Andrew L. Jackson (jacksonal300@gmail.com)
 * @Date: 2017-03-03 16:12:08
 * @Last Modified by: Andrew L. Jackson (jacksonal300@gmail.com)
 * @Last Modified time: 2017-03-03 16:13:14
 */

import * as React from 'react';
import { BanesAndBoonsInfo } from '../../services/session/banesAndBoons';
import Trait, { TraitStyle } from './Trait';
import { styleConstants } from '../../styleConstants';

const Boon = (props: {
  trait: BanesAndBoonsInfo;
  onBoonClick: Function;
  onCancelBoon: Function;
  onUpdateRankBoon: Function;
  allPrerequisites: Array<BanesAndBoonsInfo>;
  allExclusives: Array<BanesAndBoonsInfo>;
  addedBoons: Array<BanesAndBoonsInfo>;
  styles: Partial<TraitStyle>;
}) => {
  const {
    trait,
    onBoonClick,
    onCancelBoon,
    onUpdateRankBoon,
    allPrerequisites,
    allExclusives,
    addedBoons,
    styles
  } = props;
  const boonStyles = Object.assign(
    {},
    styles,
    { trait: { ...styleConstants.marginRight, ...styles.trait } }
  );
  return (
    <Trait
      type='Boon'
      trait={trait}
      onTraitClick={onBoonClick}
      onCancelTrait={onCancelBoon}
      onUpdateRankTrait={onUpdateRankBoon}
      allPrerequisites={allPrerequisites}
      allExclusives={allExclusives}
      addedTraits={addedBoons}
      primaryColor='#41ACE9'
      styles={boonStyles}
    />
  )
};

export default Boon;
