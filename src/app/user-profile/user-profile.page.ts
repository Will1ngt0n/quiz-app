import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx'
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  currentPhoto
  userProfile 
  constructor(public userService : UserService, public navControl : NavController, public alertController: AlertController, public file : File, public fileChooser : FileChooser) {
    this.userProfile = this.userService.returnUserProfile()
    this.userProfile = this.userProfile[0]
    console.log(this.userProfile);
    
    this.checkDir()
  }

  ngOnInit() {
  }

  fetchProfile(){
    
  }



  openAlert(){

    this.fileChooser.open()
    .then(uri => {
      alert(uri)
      console.log(uri);
      this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {

        alert(newUrl)
        console.log(newUrl);
        let filePath = newUrl.nativeURL;
        console.log(filePath);
        let dirSegments = filePath.split('/')
        dirSegments.pop()
        console.log(dirSegments);
        let fileDir = dirSegments.join('/')
        console.log("fileDir = " + fileDir);
        
        alert(fileDir)
        this.file.readAsArrayBuffer(fileDir, newUrl.name).then(async(buffer) =>{
          alert(buffer)
          console.log("buffer = " + buffer);
          
         await this.upload(buffer, newUrl.name)
         alert(buffer +  newUrl.name)
        })
      })
    }).catch(e => console.log(e));

    

  // let currentFile = this.file.checkDir(this.file.dataDirectory, 'mydir')
  // console.log(currentFile)
  }

  async upload(buffer, name){
    let blob = new Blob([buffer], {type: 'image/jpeg'})
    this.currentPhoto = blob
  }
  checkDir(){
    console.log(this.file)
  }
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Picture',
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
