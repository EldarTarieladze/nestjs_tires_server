import { ITire } from 'models/tires.model';

export class TTireADD {
  public readonly success: boolean;
  public readonly msg: string;
}

export class TAuth {
  public readonly success: boolean;
  public readonly access_token: string;
}

export class TGetTire {
  public readonly success: boolean;
  public readonly tire?: ITire;
}
