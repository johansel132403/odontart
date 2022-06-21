import  { Injectable } from '@angular/core';

import { ServiceModel } from '../model/service.model';

@Injectable()


export class DatosServios{

    private services: ServiceModel[] = [
        {
          id:'1',
          title:'LIMPIEZA SIMPLE ',
          imagenURL:'../../assets/img/limpieza_preview_rev_1.png',
          comentarios: ['La limpieza sencilla o “prophylaxis”se refiere a remoción calculo “supragingival” (sobre la linea de las encías), placa dental y manchas que se depositan sobre los dientes. Este tipo de limpieza generalmente no requiere de anestesia dental aún cuando tejidos que rodean al diente están inflamados (“gingivitis”). Se realiza cada 6 meses.']
        },
        {
          id:'2',
          title:'CAMBIO DE GOMAZ',
          imagenURL:'../../assets/img/gomita01_preview_rev_1.png',
          comentarios: ['Los elásticos en ortodoncia o gomas son indispensables para alcanzar un buen resultado en tu tratamiento con aparato.']
        }, {
          id:'3'  ,
          title:'ENDONDOCIA',
          imagenURL:'../../assets/img/endodoncia_preview_rev_1.png',
          comentarios: ['La endodoncia es un procedimiento que tiene como finalidad preservar las piezas dentales dañadas, evitando así su pérdida']
        }, {
          id:'4',
          title:'CLASE I',
          imagenURL:'../../assets/img/carie.jpeg',
          comentarios: ['Clase 1', ' Afecta las caras oclusales del sector posterior. ']
        }, {
          id:'5',
          title:'CLASE II',
          imagenURL:'../../assets/img/caries02.jpeg',
          comentarios: ['Clase 2', 'Cuando están cariadas las caras ínter-proximales del sector posterior (mesial y distal).']
        }, {
          id:'6',
          title:'CLASE III',
          imagenURL:'../../assets/img/caries03.jpeg',
          comentarios: ['Clase 3', 'Afecta las caras inter-proximales del sector anterior.']
        }, {
          id:'7',
          title:'CLASE IV',
          imagenURL:'.../../assets/img/caries-4 (1).jpeg',
          comentarios: ['Clase 4', 'Afecta las caras ínter-proximales del sector anterior y el borde incisal.']
        }, {
          id:'8',
          title:'V',
          imagenURL:'../../assets/img/caries05.jpg',
          comentarios: ['Clase 5', 'Es cuando está afectada la parte cervical de cualquier diente.']
        }, {
          id:'9',
          title:'RX PANORAMICA',
          imagenURL:'../../assets/img/rxpanoramica_preview_rev_1.png',
          comentarios: ['Los rayos X panorámicos dentales utilizan una dosis muy pequeña de radiación ionizante para capturar una imagen de toda la boca.']
        }, {
          id:'10',
          title:'Rx Periapical',
          imagenURL:'../../assets/img/Periopacal.png',
          comentarios: ['Una radiografía periapical forma parte de las denominadas radiografías intraorales, es decir, aquellas que se realizan mediante la colocación de placas radiológicas de diferente tamaño dentro de la boca, con el fin de obtener imágenes completas de uno o dos dientes  y estudiarlo en su totalidad: ápice, corona, raíz, tejido óseo y espacio periodontal.', ' ']
        }, {
          id:'11',
          title:'ORTODONCIA COMPLETA',
          imagenURL:'../../assets/img/ortodoncia1.jpg',
          comentarios: ['El proceso de ortodoncia es el conjunto de movimientos dentarios que se realizan para mejorar la estética, función y masticación de tu boca.', 'Se divide en varias etapas hasta lograr la sonrisa deseada.']
        }, {
          id:'12',
          title:'APARATO DE LEVANTAR MORDIDA',
          imagenURL:'../../assets/img/sobremordida.jpg',
          comentarios: ['Los levantes de mordida son unos salientes en los alineadores que actúan de tope para evitar que los dientes superiores choquen con los inferiores.', 'Son elementos auxiliares pasivos que ayudan a corregir problemas ortodóncicos pero que por sí sólo no corrigen un problema.']
        }, {
          id:'13',
          title:'BOTON DE NANCE',
          imagenURL:'../../assets/img/nance.jpg',
          comentarios: ['El botón de Nance es un mantenedor de espacio utilizado en aparatos de ortopedia funcional de los maxilares que es una especialidad odontológica que diagnostica, previene, controla y trata los problemas de crecimiento y desarrollo de nuestra cara y maxilares.', ' Es decir, las maloclusiones, eliminando cualquier interferencia o alteración que impida un correcto desarrollo de esta.']
        }
      ]

    constructor(){}

    getServicios(){
        return [...this.services]
    }

    getServicio(Id: string){
      
        //aqui esto retornando un objeto ....
        return {
            ...this.services.filter(serv => {
                return serv.id ===  Id
            })

        }

    }

    addServicio( title: string, imagenURL: string ){

        this.services.push({
            title,
            imagenURL,
            comentarios: [],
            id: this.services.length + 1 + "" // al poner esta comilla estoy convirtiendo este numero en un string,
        })
    }

    deleteServicio(Id: string){
        //Esto lo que va hacer es retorname todos los servicios meno el que yo borre
       this.services =  this.services.filter(serv => {
            return serv.id !== Id       // esto aqui tengo que analizarlo.....
        })
    }



}