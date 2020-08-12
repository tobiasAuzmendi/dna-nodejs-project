import { Request, Response, NextFunction } from 'express';
import Validator from 'validatorjs';
import mongoose from 'mongoose';

const Dna  = mongoose.model('Dna');
const VALID_NITROGENOUS_BASES = ['A', 'T', 'C', 'G'];

interface MutationInformation {
  invalidBase: boolean;
  hasMutation?: boolean;
}

const getMutationStats = async (req: Request, res: Response, next: NextFunction) => {
  const dnasWithMutation = await Dna.countDocuments({ hasMutation: true });
  const dnasWithoutMutation = await Dna.countDocuments({ hasMutation: false });

  return res.json({
    count_mutations: dnasWithMutation,
    count_no_mutation: dnasWithoutMutation,
    ratio: +(dnasWithMutation / dnasWithoutMutation).toFixed(2)
  });
};

const checkSequence = async (req: Request, res: Response, next: NextFunction) => {
  const dna = JSON.parse(req.body.dna);
  const checkSequenceValidation = _getCheckSequenceValidation(dna);

  if (!checkSequenceValidation.passes) {
    return res.status(400).send({
        message: checkSequenceValidation.firstErrorMessage
    });
  } else {
    const mutationInformation: MutationInformation = _getMutationInformation(dna);

    if (mutationInformation.invalidBase) {
      return res.status(403).send('Base nitrogenada no válida');
    } else {
      await registerDnaRequest(dna, mutationInformation.hasMutation as boolean);

      if (mutationInformation.hasMutation) {
        return res.status(200).send('Mutación encontrada');
      } else {
        return res.status(403).send('Mutación no encontrada');
      }
    }
  }
};

const registerDnaRequest = async (dna: string[], hasMutation: boolean) => {
  const dnaPlainSequence = dna.join('');

  let dnaInstance = await Dna.findOne({ dnaPlainSequence: dnaPlainSequence });

  if (!dnaInstance) {
    const dnaBody = {
      dnaPlainSequence: dnaPlainSequence,
      hasMutation: hasMutation
    };
    const newDna = new Dna(dnaBody);

    await newDna.save();
  }

  return;
}

const _getCheckSequenceValidation = (dna: string[]) => {
  const rules = {
    dna: 'required|array'
  };

  const validation = new Validator({ dna }, rules),
    passes = validation.passes(),
    errors = validation.errors.errors;

  return {
    passes: passes,
    firstErrorMessage: passes ? '' : errors[Object.keys(errors)[0]][0]
  };
}

const _getMutationInformation = (dna: string[]): MutationInformation => {
  const someInvalidSequence: boolean = dna.some(sequence => sequence.split('').some(y => !VALID_NITROGENOUS_BASES.some(nb => nb === y)));

  if (someInvalidSequence) {
    return {
      invalidBase: true
    };
  }

  const size: number = dna.length;
  const hasAValidSize: boolean = !dna.some(sequence => sequence.length !== size);

  if (!hasAValidSize) {
    return {
      invalidBase: true
    };
  }

  let mutationsFound: number = 0;

  // horizontal sequences
  for (let i = 0; i < dna.length && mutationsFound < 2; i++) {
    mutationsFound += _getSequenceMutations(dna[i].split(''));
  }

  // vertical sequences
  const verticalSequences = new Array(dna.length);
  for (let i = 0; i < dna.length && mutationsFound < 2; i++) {
    dna[i].split('').forEach((x, j) => {
      if (verticalSequences[j]) {
        verticalSequences[j].push(x);
      } else {
        verticalSequences[j] = [x];
      }
    });
  }

  for (let i = 0; i < verticalSequences.length && mutationsFound < 2; i++) {
    mutationsFound += _getSequenceMutations(verticalSequences[i]);
  }

  // 45 degrees diagonals
  const diagonals_1 = new Array(2 * dna.length - 1);
  for (let i = 0; i < diagonals_1.length && mutationsFound < 2; ++i) {
    diagonals_1[i] = [];
    if (i < dna.length) {
      for (let j = 0; j <= i; ++j) {
        diagonals_1[i].push(dna[i - j][j]);
      }
      mutationsFound += _getSequenceMutations(diagonals_1[i]);
    } else {
      for (let j = dna.length - 1; j > i - dna.length; --j) {
        diagonals_1[i].push(dna[j][i - j]);
      }
      mutationsFound += _getSequenceMutations(diagonals_1[i]);
    }
  }

  // 135 degrees diagonals
  const diagonals_2 = new Array(2 * dna.length - 1);
  for (let i = diagonals_2.length - 1; i >= 0 && mutationsFound < 2; --i) {
    diagonals_2[i] = [];
    if (i >= dna.length) {
      let colCount = 0;
      for(var j = dna.length - 1; j > i - dna.length; --j) {
        diagonals_2[i].push(dna[i - j][colCount]);
        colCount++;
      }

      mutationsFound += _getSequenceMutations(diagonals_2[i]);
    } else {
      for (let j = dna.length - 1; j >= i; --j) {
        diagonals_2[i].push(dna[j - i][j]);
      }
      mutationsFound += _getSequenceMutations(diagonals_2[i]);
    }
  }

  return {
    invalidBase: false,
    hasMutation: mutationsFound >= 2
  }
}



const _getSequenceMutations = (list: string[]): number => {
  let mutationsFound: number = 0;
  let coincidencesCounter: number = 1;

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] === list[i + 1]) {
      coincidencesCounter++;
      if (coincidencesCounter === 4) {
        mutationsFound += 1;
      }
    } else {
      coincidencesCounter = 1;
    }
  }

  return mutationsFound;
}

export default {
  getMutationStats: getMutationStats,
  checkSequence: checkSequence
}