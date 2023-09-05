declare class SupportingGoal {
    name: string;
    completionDate: Date;
}
export declare class CreateGoalDto {
    name: string;
    importance: string;
    completionDate: Date;
    type: string;
    achievedFeeling: string;
    accomplishingCharacteristics: string[];
    accomplishingRelationships: string[];
    accomplishingCharacteristicsNeeded: string[];
    accomplishingRelationshipsNeeded: string[];
    supportingGoals: SupportingGoal[];
    image?: string;
    images?: string[];
    isGoalPublic?: boolean;
    GoalDetails?: string;
}
export {};
