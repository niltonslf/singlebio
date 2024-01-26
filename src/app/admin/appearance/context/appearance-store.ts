'use client'

import {makeAutoObservable} from 'mobx'

import {ThemeButtonStyles, UserTheme} from '@/domain/models'
import {deepEqual, parseUserPageUrl} from '@/utils'

import {parseThemeToQuery} from '../utils'

type Aux = {
  backgroundFile?: File
}

class AppearanceStore {
  private initialData: UserTheme = {
    backgroundImage: '',
    backgroundColor: '',
    buttonBackground: '#FFF',
    buttonTextColor: '#000',
    buttonStyle: 'default',
    usernameColor: '#000',
    socialIconColor: '#000',
    socialDefaultColor: false,
    name: '',
  }
  private themeConfig: UserTheme = {...this.initialData}
  private themeConfigInitial: UserTheme = {...this.initialData}

  public aux: Aux = {
    backgroundFile: undefined,
  }

  constructor() {
    makeAutoObservable(this)
  }

  get theme() {
    return {...this.themeConfig}
  }

  get hasChanges() {
    return !deepEqual(this.themeConfig, this.themeConfigInitial)
  }

  getPreviewUrl(username: string) {
    return `${parseUserPageUrl(username)}/?preview=true&${parseThemeToQuery(
      this.themeConfig,
    )}`
  }

  setTheme(theme: UserTheme) {
    this.themeConfig = {...theme}
    this.themeConfigInitial = {...theme}
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
    this.themeConfig = {...this.initialData}
    this.themeConfigInitial = {...this.initialData}

    this.aux.backgroundFile = undefined
  }
}

const appearanceStore = new AppearanceStore()
export {appearanceStore}
