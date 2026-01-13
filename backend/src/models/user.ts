import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definimos la interfaz para TypeScript
export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware de Mongoose: Antes de guardar, encriptar la contraseña
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Método para comparar contraseñas (Login)
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// OJO: Al usar "NodeNext" y ESM, la exportación es clave.
export const User = mongoose.model<IUser>('User', UserSchema);
