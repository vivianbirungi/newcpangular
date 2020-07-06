import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {FacilitiesService} from "./facilities.service";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService:FacilitiesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return this.coursesService.findCourseById(route.params['id']);
    }

}
