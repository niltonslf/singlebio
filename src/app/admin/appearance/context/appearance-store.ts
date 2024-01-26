'use client'

import {makeAutoObservable} from 'mobx'

import {adminStore} from '@/app/admin/context/admin-store'
import {ThemeButtonStyles, UserTheme} from '@/domain/models'
import {deepEqual} from '@/utils'

type Aux = {
  backgroundFile?: File
}

export class AppearanceStore {
  constructor() {
    makeAutoObservable(this)
  }

  private initialData: UserTheme = {
    backgroundImage: '',
    backgroundColor: '',
    buttonBackground: '',
    buttonTextColor: '',
    buttonStyle: 'default',
    usernameColor: '',
    socialIconColor: '',
    socialDefaultColor: false,
    name: '',
  }
  private themeConfig: UserTheme = {...this.initialData}

  public aux: Aux = {
    backgroundFile: undefined,
  }

  get theme() {
    return {...this.themeConfig}
  }

  get hasChanges() {
    return !deepEqual(this.themeConfig, adminStore.user?.theme)
  }

  setTheme(theme: UserTheme) {
    this.themeConfig = {...theme}
  }

  setBackgroundFile(file?: File) {
    this.aux.backgroundFile = file
  }
  setBackgroundImage(value: string) {
    this.themeConfig.backgroundImage = value
  }
  setBackgroundColor(value: string) {
    this.themeConfig.backgroundColor = value
  }
  setButtonBackground(value: string) {
    this.themeConfig.buttonBackground = value
  }
  setButtonTextColor(value: string) {
    this.themeConfig.buttonTextColor = value
  }
  setButtonStyle(value: string) {
    this.themeConfig.buttonStyle = value as ThemeButtonStyles
  }
  setUsernameColor(value: string) {
    this.themeConfig.usernameColor = value
  }
  setSocialIconColor(value: string) {
    this.themeConfig.socialIconColor = value
  }

  reset() {
    if (!adminStore.user?.theme) return

    this.themeConfig = {...adminStore.user?.theme}
    this.aux.backgroundFile = undefined
  }
}

const appearanceStore = new AppearanceStore()
export {appearanceStore}
