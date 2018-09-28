/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { SignalRHub } from '../SignalRHub';
import { EventMap } from '../../utils/eventMapper';

// UI EVENT NAMES
export const hubEvents = {
  joined: 'warbands/joined',
  update: 'warbands/update',
  quit: 'warbands/quit',
  abandoned: 'warbands/abandoned',
  memberJoined: 'warbands/memberJoined',
  memberUpdate: 'warbands/memberUpdate',
  memberRemoved: 'warbands/memberRemoved',
  inviteReceived: 'warbands/inviteReceived',
};

const groupsHubEventsMap: EventMap[] = [
  {
    receive: 'warbandJoined',
    send: hubEvents.joined,
  },
  {
    receive: 'warbandUpdate',
    send: hubEvents.update,
  },
  {
    receive: 'warbandQuit',
    send: hubEvents.quit,
  },
  {
    receive: 'warbandAbandoned',
    send: hubEvents.abandoned,
  },
  {
    receive: 'warbandMemberJoined',
    send: hubEvents.memberJoined,
  },
  {
    receive: 'warbandMemberUpdated',
    send: hubEvents.memberUpdate,
  },
  {
    receive: 'warbandMemberRemoved',
    send: hubEvents.memberRemoved,
  },
  {
    receive: 'warbandInviteReceived',
    send: hubEvents.inviteReceived,
  },
];

export const groupsHub = new SignalRHub('groupsHub', groupsHubEventsMap, { debug: game.debug });

function invokeIdentify(hub: SignalRHub) {
  hub.invoke('identify', game.accessToken, game.shardID, game.selfPlayerState.characterID)
  .done((success: boolean) => {
    if (!success) {
      if (game.debug) console.log(`groupsHub identify failed.`);
      setTimeout(() => invokeIdentify(hub), 5000);
      return;
    }
    if (game.debug) console.log(`groupsHub identify success!`);
    hub.invoke('invalidate');
  });
}

function onConnected(hub: SignalRHub) {
  if (game.debug) console.log('groupsHub onConnected');
  invokeIdentify(hub);
}

groupsHub.addEventHandler('connected', onConnected);
