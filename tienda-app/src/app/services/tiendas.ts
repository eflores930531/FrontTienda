export interface Tiendas{
    tiendaID: number;
    sucursal: string;
    direccion: string;
  }
  
  export interface TiendaResponse {
    $id: string;
    $values: Tiendas[];
  }
  