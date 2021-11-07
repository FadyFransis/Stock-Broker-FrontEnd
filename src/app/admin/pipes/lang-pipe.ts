import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/config/language.service';

@Pipe({
  name: 'langPipe',
  pure: false
})
export class LanguagePipe implements PipeTransform {
  constructor(
    private language : LanguageService
  ){}

  transform(value: any, ...args: any[]): any {
    if (this.language.locale == "arabic"){
      return args[0]
    }
    return value;
  }
}
