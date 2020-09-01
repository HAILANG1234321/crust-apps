// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountId, MemberCount } from '@polkadot/types/interfaces';

import React, { useMemo } from 'react';
import { AddressMini, Expander } from '@polkadot/react-components';

import { useTranslation } from '../translate';

interface Props {
  isAye?: boolean;
  members: string[];
  votes: AccountId[];
  threshold: MemberCount;
}

function Voters ({ isAye, members, threshold, votes }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  const counter = useMemo(
    (): string => {
      const num = threshold.toNumber();
      const max = isAye
        ? num
        : members?.length
          ? (members.length - num) + 1
          : 0;

      return `${votes.length}${max ? `/${max}` : ''}`;
    },
    [isAye, members, threshold, votes]
  );

  if (!counter || !votes.length) {
    return null;
  }

  return (
    <Expander
      summary={
        isAye
          ? t<string>('Aye {{counter}}', { replace: { counter } })
          : t<string>('Nay {{counter}}', { replace: { counter } })
      }
    >
      {votes.map((address): React.ReactNode => (
        <AddressMini
          key={address.toString()}
          value={address}
          withBalance={false}
        />
      ))}
    </Expander>
  );
}

export default React.memo(Voters);
