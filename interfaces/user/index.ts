export type UserProfileBE = {
  account_id: string
  name: {
    given_name: string
    surname: string
    familiar_name: string
    display_name: string
    abbreviated_name: string
  }
  email: string
  country: string
  locale: string
  //   email_verified: true
  //   disabled: boolean
  //   referral_link: 'https://www.dropbox.com/referrals/AAAf-AVuBhAIbz6XIztekpYnV7xAZPmK630?src=app9-3855153'
  //   is_paired: false
  //   account_type: {
  //     '.tag': 'basic'
  //   }
  //   root_info: {
  //     '.tag': 'user'
  //     root_namespace_id: '274609914'
  //     home_namespace_id: '274609914'
  //   }
}

export type UserProfileFE = {
  accountId: string
  name: {
    givenName: string
    surname: string
    familiarName: string
    displayName: string
    abbreviatedName: string
  }
  email: string
  country: string
  locale: string
}

export type TokenInfoBE = {
  access_token: string
  token_type: string
  scope: string
  uid: string
  account_id: string
  expires_in: number
}

export type TokenInfoFE = {
  accessToken: string
  tokenType: string
  scope: string
  uid: string
  accountId: string
  expiresIn: number
}
