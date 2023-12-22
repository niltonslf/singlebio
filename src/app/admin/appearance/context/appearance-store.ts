'use client'

import {makeAutoObservable} from 'mobx'

import {UserTheme} from '@/models'

import {themeToQuery} from '../utils'

type Aux = {
  backgroundFile?: File
}

const initialData = {
  backgroundImage: '',
  backgroundColor: '',
  buttonBackground: '#FFF',
  buttonTextColor: '#000',
  usernameColor: '#000',
}

class AppearanceStore {
  private themeConfig: UserTheme = {...initialData}
  private themeConfigInitial: UserTheme = {...initialData}

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
  get hasChanges() {
    return (
      this.themeConfig.backgroundImage !=
        this.themeConfigInitial.backgroundImage ||
      this.themeConfig.backgroundColor !=
        this.themeConfigInitial.backgroundColor ||
      this.themeConfig.buttonBackground !=
        this.themeConfigInitial.buttonBackground ||
      this.themeConfig.buttonTextColor !=
        this.themeConfigInitial.buttonTextColor ||
      this.themeConfig.usernameColor != this.themeConfigInitial.usernameColor
    )
  }

  setTheme(theme: UserTheme) {
    this.themeConfig = {...theme}
    this.themeConfigInitial = {...theme}
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
    this.themeConfigInitial = {...this.themeConfig}
  }
}

const appearanceStore = new AppearanceStore()
export {appearanceStore}
