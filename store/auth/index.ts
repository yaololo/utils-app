import { atom } from 'recoil'

import { BaseData } from '@/interfaces/utils'
import { UserProfileFE } from '@/interfaces/user'
import { setUnSet } from '@/lib/utils/remote-data'


export const userProfileAtom = atom<BaseData<UserProfileFE>>({
  key: 'user-profile',
  default: setUnSet(),
})
