import { useState } from 'react';
import { Union } from 'generated/graphql';
import { UniSelect } from '@components/core/Form';
import { fixtures } from '@components/core/Form/UniSelect/fixtures';

function useUniSelect() {
  const [union, setUnion] = useState<Union | undefined>({});

  const getUnionDomain = (): string | undefined => {
    const uni = fixtures.find((uni) => uni.name === union?.uni?.name);
    return uni?.domains?.[0];
  };

  return { UniSelectComponent: UniSelect, setUnion, getUnionDomain };
}

export default useUniSelect;
