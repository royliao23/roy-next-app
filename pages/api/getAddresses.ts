import type { NextApiRequest, NextApiResponse } from "next";
import generateMockAddresses from "../../src/utils/generateMockAddresses";

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber },
  } = req;

  // Validate required fields
  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  // Validate postcode length
  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  // Generic validation function for numeric fields
  const validateNumericField = (
    value: string, 
    fieldName: string
  ): ValidationResult => {
    if (!/^\d+$/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be all digits and non negative!`
      };
    }
    return { isValid: true };
  };

  // Validate postcode and street number using the shared function
  const postcodeValidation = validateNumericField(postcode as string, "Postcode");
  if (!postcodeValidation.isValid) {
    return res.status(400).send({
      status: "error",
      errormessage: postcodeValidation.errorMessage,
    });
  }

  const streetNumberValidation = validateNumericField(streetnumber as string, "Street Number");
  if (!streetNumberValidation.isValid) {
    return res.status(400).send({
      status: "error",
      errormessage: streetNumberValidation.errorMessage,
    });
  }

  // Generate mock addresses
  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string
  );

  if (mockAddresses) {
    // Add artificial delay for loading state testing
    await new Promise(resolve => setTimeout(resolve, 500));
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    errormessage: "No results found!",
  });
}