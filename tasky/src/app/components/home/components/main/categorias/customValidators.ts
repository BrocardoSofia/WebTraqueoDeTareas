import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CategoriasService } from "src/app/services/categorias.service";
//import { StudentAsyncService } from "../services/student-async.service";
//import { StudentService } from "../services/student.service";
import { HttpClient } from "@angular/common/http";

export class CustomValidators {

    // static emailExists(studentService: StudentAsyncService): AsyncValidatorFn {
    //   return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    //     if (control.value == '') {
    //       return Promise.resolve(null);
    //     } else {
    //       return studentService.getByEmail(control.value)
    //         .then(response => {
    //           return response !== null ? { 'emailExists': { value: control.value } } : null;
    //         })
    //         .catch(() => {
    //           return null; // Manejar errores aquí si es necesario
    //         });
    //     }
    //   };
    // }

    static emailExists(categoriasService)

}
