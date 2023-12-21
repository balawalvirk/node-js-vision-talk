declare class PointsOfClarity {
    myValues: string;
    myWhy: string;
    myMission: string;
}
declare class LifeGoals {
    physical: string;
    emotional: string;
    intellectual: string;
    relational: string;
    professsional: string;
}
declare class FocusList {
    desire: string;
    affirmation1: string;
    affirmation2: string;
    affirmation3: string;
    affirmation4: string;
    affirmation5: string;
    affirmation6: string;
    affirmation7: string;
    affirmation8: string;
    affirmation9: string;
    affirmation10: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    avatar?: string;
    PhoneNumber?: string;
    degree?: string;
    pointsOfClarity?: PointsOfClarity;
    lifeGoals?: LifeGoals;
    focusList?: FocusList;
    state?: string;
    city?: string;
}
export {};
