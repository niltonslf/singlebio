'use client'

import {makeAutoObservable} from 'mobx'

import {UserTheme} from '@/models'

import {themeToQuery} from '../utils'

type Aux = {
  backgroundFile?: File
}

class AppearanceStore {
  private initialData = {
    backgroundImage: '',
    backgroundColor: '',
    buttonBackground: '#FFF',
    buttonTextColor: '#000',
    usernameColor: '#000',
  }
  private themeConfig: UserTheme = this.initialData
  private themeConfigInitial: UserTheme = this.initialData

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
    if (!theme) return

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
    this.themeConfig = {...this.initialData}
    this.themeConfigInitial = {...this.initialData}

    this.aux.backgroundFile = undefined
  }
}

const appearanceStore = new AppearanceStore()
export {appearanceStore}
