import { Injectable } from '@nestjs/common';
import { createPreferenceDto } from './dto/createPreference.dto';
import Preference from 'src/shared/models/preferences';
import { NotFoundException } from '@nestjs/common';
import { updatePreferenceDto } from './dto/updatePreference.dto';

@Injectable()
export class PreferencesService {
  async create(
    user_id: string,
    preferenceData: createPreferenceDto,
  ): Promise<Preference> {
    return await Preference.create({
      ...preferenceData,
      userId: user_id,
    });
  }

  async update(
    user_id: string,
    preferenceData: updatePreferenceDto,
  ): Promise<Preference> {
    const preference = await Preference.findOne({
      where: {
        userId: user_id,
        preferenceId: preferenceData.preferenceId,
      },
    });
    if (!preference) {
      throw new NotFoundException('Preference not found');
    }
    return preference.update({
      ...preferenceData,
    });
  }

  async delete(userId: string, preferenceId: string) {
    const preference = await Preference.findByPk(preferenceId);
    if (!preference) {
      throw new NotFoundException('Preference not found');
    }
    return await Preference.destroy({
      where: {
        userId: userId,
        preferenceId: preferenceId,
      },
    });
  }
}
