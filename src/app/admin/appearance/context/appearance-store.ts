'use client'

import {makeAutoObservable} from 'mobx'

import {UserTheme} from '@/models'

import {themeToQuery} from '../utils'

type Aux = {
  backgroundFile?: File
}

class AppearanceStore {
  private themeConfig: UserTheme = {
    backgroundImage: '',
    backgroundColor: '',
    buttonBackground: '#FFF',
    buttonTextColor: '#000',
    usernameColor: '#000',
  }

  public aux: Aux = {
    backgroundFile: undefined,
  }

  constructor() {
    makeAutoObservable(this)
  }

  get theme() {
    return {...this.themeConfig}
  }

  get previewUrl() {
    return `preview?&${themeToQuery(this.themeConfig)}`
  }

  setThemeConfig(theme: UserTheme) {
    this.themeConfig = theme
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
  setUsernameColor(value: string) {
    this.themeConfig.usernameColor = value
  }
  setBackgroundFile(file?: File) {
    this.aux.backgroundFile = file
  }

  reset() {
    this.themeConfig = {
      backgroundImage: '',
      backgroundColor: '',
      buttonBackground: '#FFF',
      buttonTextColor: '#000',
      usernameColor: '#000',
    }

    this.aux.backgroundFile = undefined
  }
}

const appearanceStore = new AppearanceStore()
export {appearanceStore}
