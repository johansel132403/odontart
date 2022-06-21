                                                                         // este metodo ya no se esta usando...
// Este metodo es para la fecha.....

export function fechaServicio(){



    let fecha = new Date();
          //este codigo pudo resolver todo este metodo
            var manana=new Date(fecha.getTime() + 24*60*60*1000);
            

    var spl = manana.toString();
    var val = spl.split(' ')
    var num = val[2]
   

    const formatoMap = {
      dd: parseInt(num),
      mm: fecha.getMonth() +1,
      yyyy: fecha.getFullYear()
  };

  

        // Este codigo es lo mismo que el que esta abajo pero mejor nos ahora lineas de codigo....
  // mes = (mes < 10) ? ("0" + mes) : mes;
  // dia = (dia < 10) ? ("0" + dia) : dia;


  let fecha02;
  if(formatoMap.dd < 10 ){

    fecha02 = `${formatoMap.yyyy}-${formatoMap.mm}-0${formatoMap.dd}`;

        if(formatoMap.mm < 10){
          fecha02 = `${formatoMap.yyyy}-0${formatoMap.mm}-0${formatoMap.dd}`;
        }
    
  }else if(formatoMap.mm < 10){
    
    fecha02 =  `${formatoMap.yyyy}-0${formatoMap.mm}-${formatoMap.dd}`;

  }else{
    fecha02 =  `${formatoMap.yyyy}-${formatoMap.mm}-${formatoMap.dd}`;

  }

 

  return fecha02;
}



 //   let fecha = new Date();

  //   const formatoMap = {
  //     dd: fecha.getDate() +1,
  //     mm: fecha.getMonth() +1,
  //     yyyy: fecha.getFullYear()
  // };

  // let fecha02;
  // if(formatoMap.dd < 10 ){

  //   fecha02 = `${formatoMap.yyyy}-${formatoMap.mm}-0${formatoMap.dd}`;

  //       if(formatoMap.mm < 10){
  //         fecha02 = `${formatoMap.yyyy}-0${formatoMap.mm}-0${formatoMap.dd}`;
  //       }
    
  // }else if(formatoMap.mm < 10){
    
  //   fecha02 =  `${formatoMap.yyyy}-0${formatoMap.mm}-${formatoMap.dd}`;

  // }else{
  //   fecha02 =  `${formatoMap.yyyy}-${formatoMap.mm}-${formatoMap.dd}`;

  // }
  