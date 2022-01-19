import {
  BackLink,
  CheckboxField,
  Link,
  Text,
  Title,
} from "@kiebitz-oss/common";
import { t, Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import { useRouter } from "next/router";
import { ChangeEventHandler, Reducer, useEffect, useReducer } from "react";
import type { PublicProvider } from "vanellus";
import { useFinder } from "./FinderProvider";
import { ProviderCard } from "./ProviderCard";

enum ActionType {
  SET_ACCESSIBLE = "SET_ACCESSIBLE",
  SET_PROVIDERS = "SET_PROVIDERS",
}

type Action =
  | {
      type: ActionType.SET_ACCESSIBLE;
      accessible: boolean;
    }
  | { type: ActionType.SET_PROVIDERS; providers: PublicProvider[] };

type State = {
  loading: boolean;
  accessible: boolean;
  providers: PublicProvider[];
  filteredProviders: PublicProvider[];
};

const initialState = {
  loading: true,
  accessible: false,
  providers: [],
  filteredProviders: [],
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_ACCESSIBLE: {
      return {
        ...state,
        accessible: action.accessible,
        filteredProviders:
          action.accessible === true
            ? state.providers.filter(
                (provider) => provider.accessible === action.accessible
              )
            : state.providers,
      };
    }

    case ActionType.SET_PROVIDERS: {
      return {
        ...state,
        loading: false,
        filteredProviders: action.providers,
        providers: action.providers,
      };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export const LocationStep: React.FC = () => {
  const router = useRouter();
  const { api } = useApp();
  const { setProvider } = useFinder();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    api
      .getProviders("10000", "99999")
      .then((providers) =>
        dispatch({ type: ActionType.SET_PROVIDERS, providers })
      );
  }, [api]);

  const handleAccessibleChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: ActionType.SET_ACCESSIBLE,
      accessible: event.currentTarget.checked,
    });
  };

  return (
    <main id="finder-location">
      <BackLink href="/">
        <Trans id="user.finder.location.back-link">
          Zurück zu den allgemeinen Informationen
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2" className="ml-4 sm:ml-0">
        <Trans id="user.finder.location.title">Impfstellen</Trans>
      </Title>

      <Text variant="text1" className="mb-8 ml-4 sm:ml-0">
        <Trans id="user.finder.location.intro">
          Wählen Sie aus den möglichen Optionen, wo Sie geimpft werden möchten.
        </Trans>
      </Text>

      <div className="mx-4 mb-8 lg:mx-8">
        <CheckboxField
          label={t({
            id: "user.finder.location.accessible.label",
            message: "Nur barrierefreie Impfstellen",
          })}
          name="accessible"
          onChange={handleAccessibleChange}
        />
      </div>

      <ul className="grid grid-flow-row gap-4 md:px-0 md:max-w-2xl">
        {state.providers === null ? (
          <div>loading...</div>
        ) : (
          state.filteredProviders.map((provider) => (
            <li key={provider.id}>
              <Link
                data-id={provider.id}
                href="/finder/appointment"
                onClick={(event) => {
                  event.preventDefault();
                  setProvider(provider);
                  router.push("/finder/appointment");
                }}
                className="block"
              >
                <ProviderCard provider={provider} />
              </Link>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};
