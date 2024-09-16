import { Component, OnInit, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  fullText: string = 'Desarrollador web junior con más de 2 años de experiencia especializado en tecnologías front-end como JavaScript, Angular, HTML y CSS. Poseo una gran capacidad para solucionar problemas y mejorar la usabilidad con atención al detalle, capaz de manejar múltiples tareas y eficaz a la hora de ajustarse a nuevos roles y desafíos. Comprometido con el aprendizaje continuo y la actualización tecnológica, busco una posición donde pueda crecer profesionalmente y aportar en un entorno dinámico.';
  displayedText: string = ''; // Texto que se irá mostrando
  index: number = 0;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('sobreMiSection') sobreMiSection!: ElementRef;
  progress: number = 0;
  volume: number = 0.02; // Volumen inicial bajo
  songName: string = ''; // Nombre de la canción

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const textElement = document.getElementById('typed-text');
    if (textElement) {
      textElement.style.visibility = 'visible'; // Hacer visible el texto
    }
    this.typeWriter();
  }

  ngAfterViewInit() {
    console.log('After view init');
    this.audioPlayer.nativeElement.addEventListener('timeupdate', this.updateProgress.bind(this));
    this.adjustVolume(); // Ajusta el volumen al iniciar
    this.extractSongName();
    // Notifica a Angular sobre los cambios realizados
    this.cdr.detectChanges();
  }

  typeWriter(): void {
    if (this.index < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeWriter(), 20); // Ajusta la velocidad aquí
    }
  }

  play() {
    this.audioPlayer.nativeElement.play();
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
  }
  reset() {
    const audio = this.audioPlayer.nativeElement;
    audio.pause(); 
    audio.currentTime = 0; // Restablecer la canción al inicio
    this.progress = 0;
    this.play(); // Resetear el progreso visual
  }

  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.duration) {
      this.progress = (audio.currentTime / audio.duration) * 100;
    }
  }

  adjustVolume() {
    this.audioPlayer.nativeElement.volume = this.volume;
  }

  extractSongName() {
    const audioSrc = this.audioPlayer.nativeElement.src;
    const fileName = audioSrc.split('/').pop();
    if (fileName) {
      this.songName = decodeURIComponent(fileName.split('.').slice(0, -1).join('.')); // Decodifica el nombre del archivo
    }
  }
  openEmailPopup() {
    const email = 'jorgesanchez0296.7@gmail.com';
    const subject = encodeURIComponent('Consulta desde la web');
    const body = encodeURIComponent('Escribe tu mensaje aquí...');
  
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  }
  scrollToSobreMi() {
    this.sobreMiSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  descargarPDF() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/CVJorge.pdf';  // Ruta del archivo PDF 
    link.download = 'CV Jorge Sanchez';  // Nombre con el que se descargará
    link.click();
  }
}
 

