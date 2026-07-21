# No design context retrieved

The required `get_design_context` calls were not attempted because the initial document-level metadata request was denied and therefore yielded no verified visual node IDs. Calling it on guessed IDs would violate the requirement not to fabricate or assume design structure.

When source access is restored, preserve each returned context verbatim in this directory, with a manifest entry tying it to its Figma node ID.
