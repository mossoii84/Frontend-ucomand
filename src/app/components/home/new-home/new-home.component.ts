import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, HostListener, OnInit, inject } from '@angular/core';
import { VacancyLibraryComponent, ResumeLibraryComponent } from '../../../../common-uteam-library';
import { HackathonCadComponent } from '../hackathon-cad/hackathon-cad.component';
import { ProjectComponent } from '../project/project.component';
import { HomeService } from '../home.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { SettingHeaderService } from '../../setting-header.service';
import { OneSectionComponent } from '../one-section/one-section.component';

@Component({
  selector: 'app-new-home',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, VacancyLibraryComponent, OneSectionComponent],
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.css'
})
export class NewHomeComponent implements OnInit {

  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly  settingHeaderService = inject(SettingHeaderService);

  isVisibleFilter: boolean = false;
  vacancyList : any;
  projectList : any;
  resumeList : any;
  hackathonList : any;

  vacancies: string[] = [];
  resumes: string[] = [];
  

  isDesktop = false;
  isTablet = false;
  isMobile = false;


  ngOnInit() {
    // this.settingHeaderService.isFilterState$.subscribe(value => {
    //   this.isVisibleFilter = value;
    // });

    this.updateView(window.innerWidth);



    this.homeService.getVacancies()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
        this.vacancyList = res.filter((resume: any) => resume.visibility !== "BAN");
        console.log("vacancyList", this.vacancyList)
      }
    );

    this.homeService.getResumes()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
        this.resumeList = res.filter((resume: any) => resume.visibility !== "BAN");
        console.log("resume", this.resumeList)
      }
    );

    this.homeService.getHackathons()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
        this.hackathonList = res.filter((resume: any) => resume.visibility !== "BAN");
        console.log("hackathon", this.hackathonList)
      }
    );

    this.homeService.getProject()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
        this.projectList = res.filter((resume: any) => resume.visibility !== "BAN");
        console.log("project", this.projectList)
      }
    );
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateView(event.target.innerWidth);
  }

  updateView(width: number): void {
    if (width >= 1024) {
      this.isDesktop = true;
      this.isTablet = false;
      this.isMobile = false;
    } else if (width >= 768 && width < 1024) {
      this.isDesktop = false;
      this.isTablet = true;
      this.isMobile = false;
    } else {
      this.isDesktop = false;
      this.isTablet = false;
      this.isMobile = true;
    }
  }



}