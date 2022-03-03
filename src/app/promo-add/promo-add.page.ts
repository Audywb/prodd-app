import { Component, OnInit , NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import {PromoService} from './../pshared/promo.service';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { TokenStorageService } from '../_services/token-storage.service';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-promo-add',
  templateUrl: './promo-add.page.html',
  styleUrls: ['./promo-add.page.scss'],
})
export class PromoAddPage implements OnInit {
promoForm: FormGroup;

currentUser: any;

img : any;
defaultDate = "2022-12-13T23:59:59.999Z";//set to future date
// today: string = new Date().toISOString();
today: string = new Date().toISOString();

tomorrow = new Date(new Date().setDate(new Date().getDate()+5)).toISOString();

defaultImg = "https://mediumthai.com/wp-content/uploads/2020/05/mekaionline.com-50-1-20200214105545271488-640x480-1.jpg"


ngFireUploadTask: AngularFireUploadTask;

progressNum: Observable<number>;

progressSnapshot: Observable<any>;

fileUploadedPath: Observable<string>;

files: Observable<FILE[]>;

FileName: string;
FileSize: number;

isImgUploading: boolean;
isImgUploaded: boolean;

private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

constructor(
    private proAPI:PromoService,
    private router:Router,
    public fb: FormBuilder,
    private zone: NgZone,

    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,

    private token: TokenStorageService

  ) {
    // this.promoForm = this.fb.group({
    //   title: [''],
    //   description: [''],
    //   img_url: [this.img],
    //   time_end: [this.defaultDate]
    // })

    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection = angularFirestore.collection<FILE>('anime');
    this.files = this.ngFirestoreCollection.valueChanges();

   }

  ngOnInit() {

    this.promoForm = this.fb.group({
      title: [''],
      description: [''],
      // img_url: new FormControl(),
      img_url: [this.defaultImg],
      time_end: [this.tomorrow],
      user_id: ['']
    })

    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id)
    // this.promoForm.get("img_url").setValue(this.img)
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.promoForm.get('time_end').setValue(date, {
       onlySelf: true
    })
 }

  onFormSubmit() {
    this.promoForm.get("user_id").setValue(this.currentUser.id);//setValue to form
    if (!this.promoForm.valid) {
      return false;
    } else {
      this.proAPI.addPromo(this.promoForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.promoForm.reset();
            // this.router.navigate(['/promo-display']);
            this.router.navigate(['/tabs/tab4']);
          })
        });
    }
  }


  fileUpload(event: FileList) {

    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;//upload

    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(

      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();

        console.log(this.fileUploadedPath);

        this.fileUploadedPath.subscribe(resp=>{//add to DB
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.FileSize,
          });
          this.isImgUploading = false;
          this.isImgUploaded = true;

          this.img = resp;
          console.log(this.img);
          this.promoForm.get("img_url").setValue(resp);//setValue to form

        },error => {
          console.log(error);
        })
      }),
      tap(snap => {
          this.FileSize = snap.totalBytes;
      })
    )
  }

  fileStorage(image: FILE) {
    const ImgId = this.angularFirestore.createId();

    this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }



}
