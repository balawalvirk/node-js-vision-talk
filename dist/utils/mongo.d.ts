import { Types } from 'mongoose';
declare const isMongoIdValid: (id: string) => boolean;
declare const validateMongoId: ({ value, key }: {
    value: any;
    key: any;
}) => Types.ObjectId;
declare const getStaticMongooseId: () => Types.ObjectId;
export { isMongoIdValid, validateMongoId, getStaticMongooseId };
